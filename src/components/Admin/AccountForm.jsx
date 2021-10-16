import React from "react";
import { useForm } from "react-hook-form";

export default function AccountForm({ onSubmitData }) {
  const { register, handleSubmit } = useForm();
  const onAddHandleSubmit = (data) => {
    console.log(data);
    onSubmitData(data);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onAddHandleSubmit)}>
        <div class="mb-3">
          <label for="inputUsername" class="form-label">
            Username
          </label>
          <input
            name="username"
            type="text"
            class="form-control"
            id="inputUsername"
            {...register("username", { required: true })}
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
            {...register("password", { required: true })}
          />
        </div>
        <div class="mb-3 form-check">
          <input
            name="enabled"
            type="checkbox"
            class="form-check-input"
            id="isActived"
            {...register("enabled", { required: true })}
          />
          <label class="form-check-label" for="isActived">
            Active
          </label>
        </div>
        <button type="submit" class="btn btn-primary end-0">
          Submit
        </button>
        <button type="reset" class="btn btn-secondary end-0 mx-2">
          Reset
        </button>
      </form>
    </>
  );
}
