import React from "react";
import LinesEllipsis from 'react-lines-ellipsis';
import MiddleEllipsis from "react-middle-ellipsis";




const TransactionTable = () => {
    return (
        <div className="transaction-table table-component">
            <table>
                <thead>
                    <tr className="transaction-content content-proper">
                        <th className="neg-margin point before-el-styling">
                        <LinesEllipsis
                            text='0000000000000----00000000000000'
                            maxLine='1'
                            ellipsis='...'
                            trimRight
                            basedOn='letters'
                        />
                        </th>
                        <th className="space-left-align-1 before-el-styling">8791176</th>
                        <th className="space-left-align-2 before-el-styling">16 hours</th>
                        <th className="space-left-align-3 point before-el-styling">
                        <LinesEllipsis
                            text='0000000000000----00000000000000'
                            maxLine='1'
                            ellipsis='...'
                            trimRight
                            basedOn='letters'
                        />
                        </th>
                        <th className="space-left-align-4 before-el-styling">
                        <LinesEllipsis
                            text='0000000000000----00000000000000'
                            maxLine='1'
                            ellipsis='...'
                            trimRight
                            basedOn='letters'
                        />
                        </th>
                        <th className="space-left-align-5 before-el-styling">0 bnb</th>
                        <th className="space-left-align-6">complete</th>
                    </tr>
                </thead>
            </table>
        </div>
    );
}

export default TransactionTable;