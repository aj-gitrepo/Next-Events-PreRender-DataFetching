import { Fragment } from "react";

import Button from "../components/ui/button";
import ErrorAlert from "../components/ui/error-alert";

const ErrorPage = () => {
  return (
    <Fragment>
      <ErrorAlert>
        <p style={{ marginBottom: "25px" }}>Invalid Filter. Please adjust your values</p>
        <Button link="/events">Show all events</Button>
      </ErrorAlert>
    </Fragment>
  );
}

export default ErrorPage;
