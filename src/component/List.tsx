import { useState, ChangeEvent } from "react";
import plus from './../assets/plus.svg';

const List = () => {
  const [listItems, setListItems] = useState<string[]>(['Buy new sweatshirt', 'Begin Promotional phase', 'Read an Artical', 'try Not to fall asleep', "watch 'Sherlock'", 'Begin QA For Product', 'Go For Walk']);
  // forfuture reffrence
  // const [value, setValue] = useState('');
  // const [isdone, setisDone] = useState(true)
  // const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setValue(e.target.value);
  // };

  // const handleAddClick = () => {
  //   setListItems([...listItems, value]);
  //   setValue('');
  // };

  // const handleRemoveClick = (index: number) => {
  //   const newListItems = [...listItems];
  //   newListItems.splice(index, 1);
  //   setListItems(newListItems);
  // };

  const renderedItems = listItems?.map((item, index) => (
    <div key={index}>
      <li className="listitem">
        {
          (index == 0) || (index == 1) ? (
            <div style={{ color: '#aaa' }}> {item} </div>) : (<div  style={{ color: '#555' }}>{item}</div>)

        }
        {
          (index == 0) || (index == 1) ? (
            <button className="closeBtn"></button>

          ) : (
            <button className="donebtn"></button>
          )
        }

        {/* for fucture reffrence */}
        {/* <button className="donebtn" onClick={() => handleRemoveClick(index)}></button></> */}
    </li>
    </div>
  ));

  return (
    <div>
      <div>
        <ul className="listitemContainer">
          {renderedItems}
        </ul>
      </div>
      {/* for fucture refrence */}
      {/* <input className="inputlistitem" type="text" value={value} onChange={handleInputChange} /> */}
      <button className="addButton" >
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" className="svg-inline--fa fa-plus " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"></path></svg>
      </button>

    </div>
  );
};

export default List;
