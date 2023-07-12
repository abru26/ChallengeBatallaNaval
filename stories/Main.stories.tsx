import React from "react";
import { storiesOf } from "@storybook/react";
import Button from "../components/global/Button";

storiesOf("Main", module).add("basic", () => {
  return (
    <div className="fakeBody" >
      <Button text="Test" buttonType="button" />
    </div>
  );
});