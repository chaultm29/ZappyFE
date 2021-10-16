import React from "react";
import AccountForm from "./AccountForm";

export default function AccountModal({ type, onSubmitDataInContent }) {
  const modalTitle =
    type == 0
      ? "Add Account"
      : type == 1
      ? "Account Detai"
      : type == 2
      ? "Edit Account"
      : "Delete Account";

  const onSubmitData = (submitData) => {
    console.log("AccountModal", submitData);
    onSubmitDataInContent(submitData);
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
                <AccountForm onSubmitData={onSubmitData} />
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
              <div class="modal-body">View</div>
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
              <div class="modal-body">Edit</div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" class="btn btn-primary">
                  Save changes
                </button>
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
              <div class="modal-body">Delete</div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-danger"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" class="btn btn-primary">
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
