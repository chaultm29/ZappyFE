import React from "react";
import { useForm } from "react-hook-form";

export default function AccountForm({ onSubmitData, accountBeforeEdit }) {
  const { register, handleSubmit } = useForm();
  const onHandleSubmit = (data) => {
    data.id = accountBeforeEdit.id;
    console.log("edit", data);
    onSubmitData(data);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onHandleSubmit)}>
        {/* <input
          name="id"
          type="text"
          class="form-control d-none"
          id="id"
          defaultValue={accountBeforeEdit.id}
          {...register("id", { required: true })}
        /> */}
        <div class="mb-3">
          <label for="inputUsername" class="form-label">
            Username
          </label>
          <input
            name="username"
            type="text"
            class="form-control"
            id="inputUsername"
            defaultValue={accountBeforeEdit.username}
            {...register("username")}
            required
          />
        </div>
        <div class="mb-3">
          <label for="inputPassword" class="form-label">
            Password
          </label>
          <input
            name="password"
            type="password"
            class="form-control"
            id="inputPassword"
            id="inputUsername"
            defaultValue={accountBeforeEdit.password}
            {...register("password")}
          />
        </div>
        <div class="mb-3 form-check">
          <input
            name="enabled"
            type="checkbox"
            class="form-check-input"
            id="isActived"
            {...register("enabled")}
          />
          <label class="form-check-label" for="isActived">
            Active
          </label>
        </div>
        <button type="submit" class="btn btn-primary end-0">
          Save
        </button>
        <button type="reset" class="btn btn-secondary end-0 mx-2">
          Reset
        </button>
      </form>
    </>
  );
}
