import React from "react";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";

const ReverseVoucherList = ({ list }) => {
  return (
    list.length > 0 && (
      <div className="list-wrapper">
        <div className="md:grid grid-cols-8 list-header">
          <ListHeader label="Transaction Date" />
          <ListHeader label="Vno" />
          <ListHeader label="Sub Head Name" />
          <ListHeader label="Transaction Type" />
          <ListHeader label="DR" />
          <ListHeader label="CR" />
          <ListHeader label="Particulars" />
          <ListHeader label="Voucher Type" />
        </div>
        {list.length > 0 &&
          list.map((item) => (
            <div
              key={item.Id}
              className="grid grid-cols-1 md:grid-cols-8 list-body"
            >
              <ListCol label="Transaction Date:" value={item.transactionDate} />
              <ListCol label="Vno::" value={item.vno} />
              <ListCol label="Sub Head Name:" value={item.subHeadName} />
              <ListCol
                label="Transaction Type::"
                value={item.transactionType}
              />
              <ListCol label="DR:" value={item.dr} />
              <ListCol label="CR:" value={item.cr} />
              <ListCol label="Particulars:" value={item.particulars} />
              <ListCol label="Voucher Type:" value={item.voucherType} />
            </div>
          ))}
        <div className="list-footer">
          <div className="col-span-10"></div>
          <div className="flex justify-center">
            <span className="font-semibold">TOTAL : {list.length}</span>
          </div>
        </div>
      </div>
    )
  );
};

export default ReverseVoucherList;
