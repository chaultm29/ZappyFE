import React from "react";
import AccountAddForm from "./AccountAddForm";
import AccountViewDetail from "./AccountViewDetail";
import AccountEditForm from "./AccountEditForm";

export default function AccountModal({
  type,
  account,
  onSubmitDataAccount,
  setIsDelete,
}) {
  const modalTitle =
    type == 0
      ? "Add Account"
      : type == 1
      ? "Account Detail"
      : type == 2
      ? "Edit Account"
      : "Delete Account";

  const onSubmitData = (submitData) => {
    onSubmitDataAccount(submitData);
  };
  return (
    <>
      {/* Modal add account */}
      {type == 0 ? (
        <div
          class="modal fade"
          id="ViewModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  {modalTitle}
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <AccountAddForm onSubmitData={onSubmitData} />
              </div>
            </div>
          </div>
        </div>
      ) : // modal view account
      type == 1 ? (
        <div
          class="modal fade"
          id="ViewModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  {modalTitle}
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <AccountViewDetail account={account} />
              </div>
            </div>
          </div>
        </div>
      ) : // modal edit account
      type == 2 ? (
        <div
          class="modal fade"
          id="ViewModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  {modalTitle}
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <AccountEditForm
                  accountBeforeEdit={account}
                  onSubmitData={onSubmitData}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        // modal delete account
        <div
          class="modal fade"
          id="ViewModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  {modalTitle}
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">Do you want to delete this account?</div>
              <div class="modal-footer border-0">
                <button
                  type="button"
                  class="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  class="btn btn-danger"
                  onClick={() => setIsDelete(true)}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
