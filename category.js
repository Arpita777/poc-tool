import React from "react";
import './category.css'

const Category = ({ obj, type }) => {
  return (
    <>
      <td className='numerical pln'>
        {obj[`${type}_PLN`].toFixed(0)}
      </td>
      <td className='numerical'>{obj[`${type}_LY`].toFixed(0)}</td>
      <td className='numerical'>{obj[`${type}_LY_COMP`].toFixed(0)}</td>
    </>
  );
};
export default Category;
