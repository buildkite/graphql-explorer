import React from "react";
import ReactDOM from 'react-dom';
import GraphiQL from 'graphiql';

require("graphiql/graphiql.css");
require("./css/login.css");

class Login extends React.Component {
  state = { token: null };

  render() {
    return (
      <div className="Login__Container">
        <div className="Login">
          <div className="Login__Header">
            <div className="Login__Logos">
              <img src={require('./images/logo.svg')} />
              <img src={require('./images/graphql.svg')} />
            </div>
            <h1>Buildkite GraphQL Explorer <span className="beta">Beta</span></h1>
          </div>
          <div className="Login__Body">
            <p className="Login__Intro">Enter a Buildkite API Token to get started</p>
            <p className="Login__Extra">The API token needs to have the <code>graphql</code> scope and can be created on your <a href="https://buildkite.com/user/api-access-tokens" target="_blank">API Access Tokens</a> page.</p>
            <form onSubmit={this._onSubmit.bind(this)}>
              <input type="text" onChange={this._onInputChange.bind(this)} required="true" value={this.state.token} autoFocus="true" />
              <button className="Login__Button">Login</button>
            </form>
          </div>
        </div>
        <div className="LoginBackground">
        </div>
      </div>
    );
  }

  _onInputChange(e) {
    this.setState({ token: e.target.value });
  }

  _onSubmit(e) {
    e.preventDefault();

    this.props.onLogin(this.state.token);
  }
}

class GraphQLViewer extends React.Component {
  static defaultQuery = `# Welcome to the Buildkite GraphQL Explorer
#
# This is an in-browser IDE for writing, validating, and
# testing GraphQL queries.
#
# Type queries into this side of the screen, and you will
# see intelligent typeaheads aware of the current GraphQL type schema and
# live syntax and validation errors highlighted within the text.
#
# To bring up the auto-complete at any point, just press Ctrl-Space.
#
# Press the run button above, or Cmd-Enter to execute the query, and the result
# will appear in the pane to the right.
#
# Here is a simple GraphQL query that will request your name and avatar URL

query SimpleQuery {
  viewer {
    user {
      name
      avatar {
        url
      }
    }
  }
}

# Here is a slightly more complex GraphQL query that will request not only your
# name, but the latest 10 builds for each of the build pipelines you can access.
# To run this query, you'll first need to remove the one above, then uncomment this
# one.
#
# query ComplexQuery {
#   viewer {
#     user {
#       name
#     }
#     organizations {
#       edges {
#         node {
#           name
#           pipelines {
#             edges {
#               node {
#                 name
#                 repository
#                 builds(first: 10) {
#                   edges {
#                     node {
#                       number
#                       message
#                     }
#                   }
#                 }
#               }
#             }
#           }
#         }
#       }
#     }
#   }
# }`;

  render() {
    // Fixes a bug in the latest version of GraphiQL where the defaultQuery
    // property is no longer loaded correctly.
    if(!window.localStorage.getItem("graphiql:query")) {
      window.localStorage.setItem("graphiql:query", GraphQLViewer.defaultQuery);
    }

    return (
      <GraphiQL fetcher={this._fetcher.bind(this)} defaultQuery={GraphQLViewer.defaultQuery}>
        <GraphiQL.Logo>
          <div style={{verticalAlign: "middle"}}>
            <img src={require('./images/logo.svg')} style={{height: "22px", verticalAlign: "middle", marginRight: "6px"}} /> Buildkite GraphQL Explorer
          </div>
        </GraphiQL.Logo>
      </GraphiQL>
    );
  }

  _fetcher(params) {
    return fetch(window._graphql['url'], {
      method: 'post',
      body: JSON.stringify(params),
      headers: { 'Authorization': this.props.authorization }
    }).then(response => response.json());
  }
}

class Page extends React.Component {
  state = { token: null };

  render() {
    if(!this.state.token) {
      return <Login onLogin={this._onLogin.bind(this)} />
    } else {
      return <GraphQLViewer authorization={`Bearer ${this.state.token}`} />
    }
  }

  _onLogin(token) {
    this.setState({ token: token });
  }
}

ReactDOM.render(React.createElement(Page), document.getElementById('root'));
