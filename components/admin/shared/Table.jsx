import { Fragment, useState } from "react";
import { BiDotsVertical } from "react-icons/bi";
import Pagination from "react-paginate";
import Select from "react-select";
import conditionMatched from "../../../utils/conditionMatched";
import getProperty from "../../../utils/getProperty";
import Dropdown from "./Dropdown";
import Input from "./Input";
import QueryState from "./QueryState";

export default function Table({
  query,
  headers,
  data = [],
  actions = [],
  searchPlaceholder,
  onSearch,
  pagination,
  sort = [],
}) {
  const [counter, setCounter] = useState(0);
  const [firstPageToShow, setFirstPageToShow] = useState(1);
  const [lastPageToShow, setLastPageToShow] = useState(5);
  // console.log(data);
  return (
    <>
      {(onSearch || !!sort.length) && (
        <div className="adminTable__query">
          {onSearch && (
            <div>
              <Input
                full
                placeholder={searchPlaceholder || "Search"}
                onChange={onSearch}
              />
            </div>
          )}
          {!!sort.length &&
            sort.map((item, ind) => (
              <div key={ind}>
                <Select
                  styles={{
                    control: (base) => ({
                      ...base,
                      height: 45,
                      minHeight: 45,
                    }),
                  }}
                  options={item.options}
                  onChange={item.onSort}
                  {...item.props}
                  isClearable
                />
              </div>
            ))}
        </div>
      )}
      <QueryState status={query?.status} error={query?.error}>
        <div className="adminTable">
          <table>
            <thead>
              <tr>
                {headers.map((header) => (
                  <th key={header.name}>{header.name}</th>
                ))}
                {!!actions.length && <th></th>}
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id}>
                  {headers.map((header) => (
                    <td
                      key={header.name}
                      style={{ wordBreak: "break-all", fontWeight: "bold" }}
                    >
                      {getProperty(item, header.key)}
                    </td>
                  ))}
                  {!!actions.length && (
                    <td>
                      <Dropdown
                        key={`Dropdown_${counter}`}
                        optionsElement={
                          <TableOptions
                            data={item}
                            actions={actions}
                            setCounter={setCounter}
                          />
                        }
                      >
                        <BiDotsVertical />
                      </Dropdown>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {pagination && (
          <div className="adminTable__pagination">
            <Pagination
              forcePage={pagination.page - 1}
              breakLabel="..."
              nextLabel=">"
              onPageChange={(page) => pagination.setPage(page.selected + 1)}
              pageRangeDisplayed={5}
              pageCount={pagination.totalPage}
              previousLabel="<"
              renderOnZeroPageCount={null}
            />
          </div>
        )}
      </QueryState>
    </>
  );
}

function TableOptions({ data, actions = [], setCounter }) {
  const element = actions
    .map(({ wrapper: Wrapper, show, ...ac }) =>
      show ? (
        conditionMatched(data, show) ? (
          <Fragment key={ac.name}>
            {Wrapper ? (
              <Wrapper data={data}>
                <span>{ac.name}</span>
              </Wrapper>
            ) : (
              <span
                key={ac.name}
                onClick={() => {
                  ac.onClick?.(data);
                  setCounter((value) => value + 1);
                }}
              >
                {ac.name}
              </span>
            )}
          </Fragment>
        ) : null
      ) : Wrapper ? (
        <Wrapper key={ac.name} data={data}>
          <span>{ac.name}</span>
        </Wrapper>
      ) : (
        <span
          key={ac.name}
          onClick={() => {
            ac.onClick?.(data);
            setCounter((value) => value + 1);
          }}
        >
          {ac.name}
        </span>
      )
    )
    .filter(Boolean);

  return !!element.length ? (
    <div className="adminTable__options">{element}</div>
  ) : null;
}
