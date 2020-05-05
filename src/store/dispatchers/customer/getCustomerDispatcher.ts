import { Dispatch } from "redux";
import {
  Customer,
  CustomerActionStatuses,
  CustomerCredentials,
} from "../../../interfaces/CustomerInfo";
import axios from "axios";
import { CustomerActionDispatch } from "../../reducers/customerReducer";
import { API_ENDPOINT, CUSTOMERS_POSTFIX } from "../../../consts/endpoints";
import { toastr } from "react-redux-toastr";
import { history } from "../../../layout/components/historyRouter";

export const getCustomer = (
  customerCredentials: CustomerCredentials,
  dispatch: Dispatch<CustomerActionDispatch>
) => {
  getCustomerPending(dispatch);
  axios
    // @ts-ignore
    .get(`${API_ENDPOINT + CUSTOMERS_POSTFIX + "/"}`, {
      params: {
        email: customerCredentials.email,
        password: " s",
      },
    })
    .then((response: any) => {
      getCustomerSuccess(customerCredentials, dispatch);
      toastr.success("Logged in", "Welcome!");
    })
    .catch((error: any) => {
      getCustomerFailed(dispatch);
      toastr.error("Error", "An error occured while logging in..");
    });
};

const getCustomerSuccess = (
  customerCredentials: CustomerCredentials,
  dispatch: Dispatch<CustomerActionDispatch>
) => {
  dispatch({
    type: CustomerActionStatuses.GET_CUSTOMER_SUCCESSFUL,
    payload: customerCredentials,
  });
};
const getCustomerPending = (dispatch: Dispatch<CustomerActionDispatch>) => {
  dispatch({
    type: CustomerActionStatuses.GET_CUSTOMER_PENDING,
    payload: {},
  });
};
const getCustomerFailed = (dispatch: Dispatch<CustomerActionDispatch>) => {
  dispatch({
    type: CustomerActionStatuses.GET_CUSTOMER_FAILED,
    payload: {},
  });
};