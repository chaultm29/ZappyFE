import React from "react";

import {
  useTable,
  useGlobalFilter,
  useAsyncDebounce,
  useFilters,
  useSortBy,
  usePagination,
} from "react-table";

export function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  return (
    <select
      name={id}
      id={id}
      class="form-select d-inline w-75"
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value="">Tất cả</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <span>
      Tìm kiếm:{" "}
      <input
        className="form-control w-25 inline"
        style={{ display: "inline" }}
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      // placeholder={`${count} records...`}
      />
    </span>
  );
}

function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <>
      <br />
      <div class="row mt-2">
        <div class="col-sm-6">
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        </div>
        <div class="col-sm-6 d-flex flex-row-reverse">
          {headerGroups.map((headerGroup) =>
            headerGroup.headers.map((column) =>
              column.Filter ? (
                <div key={column.id}>
                  <label for={column.id}>{column.render("Header")} : </label>
                  {column.render("Filter")}
                </div>
              ) : null
            )
          )}
        </div>
      </div>
      <div className=" flex flex-col">
        <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div
              className="shadow overflow-hidden border-b"
              style={{ borderRadius: "20px" }}
            >
              <table
                {...getTableProps()}
                className="text-center"
                style={{ width: "100%" }}
              >
                <thead className="bg-light">
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                        >
                          {column.render("Header")}
                          <span>
                            {column.isSorted
                              ? column.isSortedDesc
                                ? " ▼"
                                : " ▲"
                              : ""}
                          </span>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody
                  {...getTableBodyProps()}
                  className="bg-white divide-y divide-gray-200"
                >
                  {page.map((row, i) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          return (
                            <td
                              {...cell.getCellProps()}
                              className="px-6 py-2 whitespace-nowrap text-break border-bottom text-wrap"
                            >
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="row mx-0 ">
        <div className="pagination">
          <div class="col-3">
            <select
              value={state.pageSize}
              class="form-select d-inline w-50"
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[5, 10, 20].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Hiển thị {pageSize}
                </option>
              ))}
            </select>
          </div>

          <div class="col-3 d-flex justify-content-center">
            <span>
              Trang{" "}
              <strong>
                {state.pageIndex + 1} của {pageOptions.length}
              </strong>
            </span>
          </div>

          <div class="col-3 d-flex justify-content-center">
            <span>
              Đến trang :
              <input
                type="number"
                min="1"
                class="form-control d-inline"
                max={pageOptions.length}
                defaultValue={pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  gotoPage(page);
                }}
                style={{ width: "100px" }}
              />
            </span>
          </div>

          <div class="col-3 d-flex flex-row-reverse">
            <ul class="pagination ">
              <li
                class={!canPreviousPage ? "page-item disabled" : "page-item"}
                onClick={() => gotoPage(0)}
              >
                <a class="page-link" href="#" tabindex="-1">
                  <i class="fas fa-angle-double-left"></i>
                </a>
              </li>
              <li
                class={!canPreviousPage ? "page-item disabled" : "page-item"}
                onClick={() => previousPage()}
              >
                <a class="page-link" href="#" tabindex="-1">
                  <i class="fas fa-angle-left"></i>
                </a>
              </li>

              <li
                class={!canNextPage ? "page-item disabled" : "page-item"}
                onClick={() => nextPage()}
              >
                <a class="page-link" href="#" tabindex="-1">
                  <i class="fas fa-angle-right"></i>
                </a>
              </li>
              <li
                class={!canNextPage ? "page-item disabled" : "page-item"}
                onClick={() => gotoPage(pageCount - 1)}
              >
                <a class="page-link" href="#" tabindex="-1">
                  <i class="fas fa-angle-double-right"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Table;
