'use strict';

const DISCOUNT_TRIGGER = [
  "Code",
  "Product"
]

const DISCOUNT_TYPE = [
  "FixedAmount",
  "Rate",
  "Shipping"
]

const SYSTEM_ROLE = [
  "user",
  "admin",
  "superadmin",
  "staff"
]

const ORDER_STATUS = [
  "Unconfirm",
  "Confirm",
  "Shipping",
  "Complete",
  "Canceled",
]

const UNCONFIRM = 'Unconfirm'
const CONFIRM = 'Confirm'
const SHIPPING = 'Shipping'
const COMPLETE = 'Complete'
const CANCELED = 'Canceled'


module.exports = {
  DISCOUNT_TRIGGER,
  DISCOUNT_TYPE,
  SYSTEM_ROLE,
  ORDER_STATUS,
  UNCONFIRM,
  CONFIRM,
  SHIPPING,
  COMPLETE,
  CANCELED
};