import React from 'react';

const Banks = ({ banks }) => {
  return (
    <ul className='list-group mb-4'>
      <table>
        <tbody>
        <tr>
          <th>Bank Code</th>
          <th>Bank Name</th>
          <th>Last Updated</th>
          <th>More</th>
        </tr>
        {banks.map(bank => (
          <tr key={bank.bankCode}>
            <td>{bank.bankCode}</td>
            <td>{bank.bankName}</td>
            <td>{bank.modifiedDate}</td>
            <td><a href={'/v1/banks/' + bank.bankCode}>Edit</a></td>
          </tr>
        ))}
        </tbody>
      </table>
    </ul>
  );
};

export default Banks;