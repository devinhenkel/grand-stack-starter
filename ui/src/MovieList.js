import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import "./UserList.css";
import { withStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Paper,
  TableSortLabel
} from "@material-ui/core";

const styles = theme => ({
  root: {
    maxWidth: 700,
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
    margin: "auto"
  },
  table: {
    minWidth: 700
  }
});

class MovieList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      order: "asc",
      orderBy: "title",
      page: 0,
      rowsPerPage: 10
    };
  }

  handleSortRequest = property => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

  handlePageRequest = pageNum => {
    if (pageNum < 0) pageNum = 0;
    this.setState({page: pageNum});
  }

  render() {
    const { order, orderBy } = this.state;
    return (
      <Query
        query={gql`
          query moviesPaginateQuery(
            $first: Int
            $offset: Int
            $orderBy: _MovieOrdering
          ) {
            Movie(first: $first, offset: $offset, orderBy: $orderBy) {
              _id
              title
              tagline
              released
            }
          }
        `}
        variables={{
          first: this.state.rowsPerPage,
          offset: this.state.rowsPerPage * this.state.page,
          orderBy: this.state.orderBy + "_" + this.state.order
        }}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error</p>;

          return (
            <Paper className={this.props.classes.root}>
              <Table className={this.props.classes.table}>
              <TableHead>
                  <TableRow>
                    <TableCell
                      key="title"
                      sortDirection={orderBy === "title" ? order : false}
                    >
                      <Tooltip
                        title="Sort"
                        placement="bottom-start"
                        enterDelay={300}
                      >
                        <TableSortLabel
                          active={orderBy === "title"}
                          direction={order}
                          onClick={() => this.handleSortRequest("title")}
                        >
                          Title
                        </TableSortLabel>
                      </Tooltip>
                    </TableCell>
                    <TableCell
                      key="tagline"
                      sortDirection={orderBy === "tagline" ? order : false}
                    >
                      <Tooltip
                        title="Sort"
                        placement="bottom-end"
                        enterDelay={300}
                      >
                        <TableSortLabel
                          active={orderBy === "tagline"}
                          direction={order}
                          onClick={() => this.handleSortRequest("tagline")}
                        >
                          Tagline
                        </TableSortLabel>
                      </Tooltip>
                    </TableCell>
                    <TableCell
                      key="released"
                      sortDirection={orderBy === "released" ? order : false}
                      numeric
                    >
                      <Tooltip
                        title="Sort"
                        placement="bottom-start"
                        enterDelay={300}
                      >
                        <TableSortLabel
                          active={orderBy === "released"}
                          direction={order}
                          onClick={() => this.handleSortRequest("released")}
                        >
                          Released
                        </TableSortLabel>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.Movie.map(n => {
                    return (
                      <TableRow key={n.id}>
                        <TableCell component="th" scope="row">
                          {n.title}
                        </TableCell>
                        <TableCell>
                          {n.tagline}
                        </TableCell>
                        <TableCell numeric>
                          {n.released}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              <button onClick={() => this.handlePageRequest(this.state.page-1)}>Previous</button>
              <button onClick={() => this.handlePageRequest(this.state.page+1)}>Next</button>
            </Paper>
            
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(MovieList);
