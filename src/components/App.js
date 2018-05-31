/* eslint-disable import/no-named-as-default */
import {NavLink, Route, Switch} from "react-router-dom";

import AboutPage from "./AboutPage";
import FuelSavingsPage from "./containers/FuelSavingsPage";
import HomePage from "./HomePage";
import NotFoundPage from "./NotFoundPage";
import PropTypes from "prop-types";
import React from "react";
import {hot} from "react-hot-loader";
import {Button, Col, Row} from "antd";
import {Axis, Chart, Coord, Geom, Label, Legend} from "bizcharts";

import PieChart from "react-svg-piechart"

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

const flatBackgroundColor = ["#e46c2c", "#133b6b", "#eccc68", "#2ed573", "#2f3542", "#f1f2f6"]
const flatColor = ["white", "white", "black", "white", "white", "black"]

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pollingData: {
        "polls":
          [
            {
              "id": 1,
              "title": "Is bitcoin worth the time and money that mining requires?",
              "publishedDate": 1516605447,
              "answer": {
                "type": "Single",
                "options": [{
                  "id": 1,
                  "label": "Yes"
                },
                  {
                    "id": 2,
                    "label": "No"
                  }
                ]
              }
            },
            {
              "id": 2,
              "title": "Should chatbots replace humans in customer service jobs?",
              "publishedDate": 1516000647,
              "answer": {
                "type": "Single",
                "options": [{
                  "id": 3,
                  "label": "Yes"
                },
                  {
                    "id": 4,
                    "label": "No"
                  }
                ]
              }
            },
            {
              "id": 3,
              "title": "How are we feeling about 2018?",
              "publishedDate": 1515568647,
              "answer": {
                "type": "Single",
                "options": [{
                  "id": 5,
                  "label": "Hopeful"
                },
                  {
                    "id": 6,
                    "label": "Doubtful"
                  }
                ]
              }
            },
            {
              "id": 4,
              "title": "Which country/region have you ever visited? (Select all that applies)",
              "publishedDate": 1515482247,
              "answer": {
                "type": "Multi",
                "options": [{
                  "id": 7,
                  "label": "Hong Kong"
                },
                  {
                    "id": 8,
                    "label": "China"
                  },
                  {
                    "id": 9,
                    "label": "Australia"
                  },
                  {
                    "id": 10,
                    "label": "Thailand"
                  },
                  {
                    "id": 11,
                    "label": "Korea"
                  },
                  {
                    "id": 12,
                    "label": "Japan"
                  }
                ]
              }
            },
            {
              "id": 5,
              "title": "Will new benefits encourage you to study or work in mainland?",
              "publishedDate": 1515309447,
              "answer": {
                "type": "Single",
                "options": [{
                  "id": 13,
                  "label": "Yes"
                },
                  {
                    "id": 14,
                    "label": "No"
                  }
                ]
              }
            }
          ]
      },
      selectedIndex: 0,
    }
  }


  renderOptionPie = (question) => {
    let pieData = []
    for (let m = 0; m < question.length; m++) {
      pieData.push({title: question[m].label, value: Math.round(Math.random() * 100), color: flatBackgroundColor[m]})
    }
    return pieData
  }

  formatDate = (date) => {
    var monthNames = [
      "JAN", "FEB", "MAR",
      "APR", "MAY", "JUN", "JUL",
      "AUG", "SEP", "OCT",
      "NOV", "DEC"
    ];

    date = new Date(date)
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }

  render() {
    const activeStyle = {color: 'blue'};
    const styles = {
      pollingGrid: {
        width: "100%",
        border: "0px",
        color: "black",
        height: 100,
        textAlign: "left",
        verticalAlign: "top",
        padding: "15px",
      },
      focusGrid: {
        width: "100%",
        height: 450,
        background: "#cccccc",
        textAlign: "left",
        verticalAlign: "top",
        padding: "15px",
      },
      todayPolling: {
        fontSize: "120%",
        color: "#26658f",
        fontWeight: 500,
      },
      titleOfPolling: {
        fontSize: "120%",
        fontWeight: 500,
      },
      pollingQuestion: {
        fontSize: "100%"

      },
      dateOfPolling: {
        fontSize: "80%",
        color: "#26658f",
        fontWeight: "bold"
      },
      buttonOfPolling: {
        minWidth: 60,
        height: 35,
        marginTop: 10,
        borderRadius: "0px",
        fontWeight: "bold"
      },
      statOfPolling: {},
      pollingWrapper: {
        padding: "5px 30px",
      }
    }

    return (
      <div>
        <Col span={24} style={{textAlign: "center", backgroundColor: "#26658f", paddingTop: 20, paddingBottom: 20, color:"white"}}>
          F5 for generate new data.
          Not much time to finish it today.
          <br/>Click and Zoom the polling result.
          <br/>Responsive Size in Mobile and Web Only.
        </Col>
        <Row gutter={8}>
          {this.state.pollingData.polls.map((item, i) => (
            <Col xs={24} md={this.state.selectedIndex == i ? 24 : 12}>
              <div
                style={this.state.selectedIndex == i ? styles.focusGrid : styles.pollingGrid}
                onClick={() => {
                  this.setState({selectedIndex: i})
                }}
              >
                <Col span={16}>
                  <div style={styles.todayPolling}><img src={require("../assets/images/scmp.png")}/>SCMP | Polling -
                    Q{i + 1}.
                  </div>
                  <div style={styles.pollingWrapper}>
                    <div style={styles.titleOfPolling}>{item.title}</div>
                    <div
                      style={styles.dateOfPolling}>{this.formatDate(item.publishedDate)}</div>
                    {item.answer.options.map((e, oi) => (
                      <div>
                        <Button style={Object.assign({}, styles.buttonOfPolling, {
                          backgroundColor: flatBackgroundColor[oi],
                          color: flatColor[oi]
                        })}>
                          {e.label}
                        </Button>
                      </div>
                    ))}
                    <div>
                      Total number of votes recorded: N
                    </div>
                  </div>
                </Col>
                <Col span={8}>
                  {/*There are many better solution.
                  e.g. http://reactcommunity.org/react-chartjs/index.html
                        ant.design.pro
                        ant.Antv
                        d3.js
                  */}

                  <PieChart
                    data={this.renderOptionPie(item.answer.options)}
                    strokeWidth={0}
                    viewBoxSize={10}
                    expandOnHover={true}
                    expandSize={1}
                    onSectorHover={(d, i, e) => {

                    }}
                  />
                </Col>
              </div>
            </Col>
          ))
          }
        </Row>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default hot(module)(App);
