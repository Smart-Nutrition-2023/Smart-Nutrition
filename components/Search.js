import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { useState } from 'react';

function Search({
  selectFood,
  foodName,
  closeSearch,
  searchFood,
  searchResult,
}) {
  const [foodList, setFoodList] = useState([]);

  const enterKey = () => {
    if (window.event.keyCode == 13) {
      search();
      console.log('성공');
    }
  };

  const search = () => {
    async function fetchData() {
      fetch(
        'http://localhost:5000/foodinfo/search?' +
          new URLSearchParams({
            food: searchResult,
          }),
      )
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          setFoodList(json);
        });
    }
    fetchData();
  };

  return (
    <div>
      <div className="fixed inset-0 bg-black/50">
        <div className="fixed inset-2/4 -translate-x-2/4 -translate-y-2/4	w-80 h-80 bg-white rounded-3xl shadow-2xl border-solid border-4 border-main text-center">
          <div className="mt-8">
            <input
              className="outline outline-2"
              type="text"
              placeholder="음식검색"
              onKeyUp={enterKey}
              onChange={searchFood}
            />
            <SearchIcon className="ml-2" onClick={search} />
          </div>
          <div className="max-h-[125px] overflow-auto grid grid-cols-2 gap-2 mt-4 mx-2">
            {foodList
              ? foodList.map(function (food, index) {
                  return (
                    <input
                      key={index}
                      type="button"
                      value={food}
                      className="h-[25px] rounded-3xl text-black bg-white text-sm border-2 border-solid border-main hover:bg-main hover:text-white"
                      onClick={selectFood}
                    />
                  );
                })
              : null}
          </div>
          <div className="fixed bottom-4 w-full gird justify-center">
            <div className="font-bold mb-3">
              사진의 음식이 {foodName} 맞으신가요?
            </div>
            <button
              className="w-20 h-8 text-white bg-main rounded-3xl"
              onClick={closeSearch}
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
