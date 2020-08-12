import React from "react";
import "antd/dist/antd.css";
import { Steps, Popover } from "antd";

const { Step } = Steps;

const customDot = (dot, { status, index }) => (
  <Popover
    content={
      <span>
        step {index} status: {status}
      </span>
    }
  >
    {dot}
  </Popover>
);
export default class CustomSteps extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Steps current={1} progressDot={customDot}>
          <Step title="Reserved" description="You can hover on the dot." />
          <Step title="In Progress" description="Visited by doctor..." />
          <Step title="Waiting" description="You can hover on the dot." />
          <Step title="Paid" description="You can hover on the dot." />
        </Steps>
        ,
      </React.Fragment>
    );
  }
}
