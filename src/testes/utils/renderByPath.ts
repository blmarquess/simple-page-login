import { BrowserRouter } from "react-router-dom";
import { render } from '@testing-library/react';
import userEvent from "@testing-library/user-event";

const renderWithRouter = (ui:JSX.Element, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route)

  return {
    user: userEvent,
    ...render(ui, { wrapper: BrowserRouter }),
  }
}

export default renderWithRouter;
