/* AUTH */
export const LOGIN = "/api/user/login-admin";
export const LOGOUT = "/organizer/logout";
export const FORGET_PASSWORD = "/api/user/reset-password-email";
export const NEW_PASSWORD = "/api/user/reset-password";
export const OTP = "/api/user/verify-admin";
export const RESEND_OTP = "/api/user/resend-otp";
export const REGISTER = "/api/user/register-admin";

/* DASHBOARD  */
export const BAR_DATA = "/api/transaction/profit-unpaidprofit-view?payment_status=True";
export const PIE_DATA = "/api/transaction/paid-unpaid-withdraw";

/* Commission */
export const ALL_PAYMENT_RECORD_LIST_TRUE = "/api/transaction/all-payment-record-list?payment_status=True";
export const PROFIT_RECORD_BY_ID = "api/transaction/all-payment-record-list?transaction_id=";

/* PROFILE */
export const PROFILE = "/api/user/admin-profile";
export const EDIT_PROFILE = "/api/user/admin-edit-profile";
export const PROFILE_PIC = "/organizer/profile/profilepic";
export const BUSINESS_PROFILE = "/organizer/profile/businessprofile";
export const BUSINESS_PROFILE_PIC = "/organizer/profile/businessprofilepic";

/* CARD HOLDER */
export const USER_LIST = "/api/user/user-list";
export const USER_BY_ID = "/api/user/user-list?id=";
export const CREATE_ACCOUNT = "/api/user/create-account";
export const VERIFY_ACCOUNT = "/api/user/verify-account";
export const EDIT_ACCOUNT = "/api/user/edit-user-profile";
export const CARD_LIST = "/api/cards/cards-list?user_id=";
export const ADD_USER_CARD = "/api/cards/add-user-card";
export const EDIT_USER_CARD = "/api/cards/edit-user-card";
export const USER_CARD_BY_ID = "/api/cards/cards-list?card_id=";
export const ADMIN_dELETE_USER = "/api/user/admin-delete-user?user_id=";
export const PAYMENT_REQUEST_LIST_BY_ID = "/api/paymentRequest/payment-request-list?card_id=";

/* PAYMENT */
export const PAYMENT_REQUEST_LIST = "/api/paymentRequest/payment-request-list";
export const ALL_PAYMENT_RECORD_LIST_BY_ID = "/api/transaction/all-payment-record-list?request_id=";
export const ADD_PAYMENT_RECORD = "/api/transaction/add-payment-record";
export const GET_INVOICE = "/api/transaction/pdf?request_id=";

/* CARDS */
export const CARDS_LIST = "/api/cards/cards-list";

/* ADMIN */
export const VIEW_ADMIN_CARD = "/api/cards/view-admin-card";
export const VIEW_ADMIN_CARD_BY_ID = "/api/cards/view-admin-card?card_id=";
export const DELETE_ADMIN_CARD = "/api/cards/delete-admin-card?card_id=";
export const ADD_ADMIN_CARD = "/api/cards/add-admin-card";
export const EDIT_ADMIN_CARD = "/api/cards/edit-admin-card";
export const PAYMENT_REQUEST_BY_ADMIN = "/api/paymentRequest/add-payment-request-byadmin";

/* TRANSACTION */
export const ALL_PAYMENT_RECORD_LIST = "/api/transaction/all-payment-record-list"; 