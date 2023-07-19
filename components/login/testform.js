import React , { useCallback, useState } from 'react';
import axios from 'axios';

const TestForm = () => {
    
    const [inputValue, setInputValue] = useState({
      "email" : "",
      "password1" : "",
      "password2" : "",
      "name" : "",
      "nickname" : "",
      "phonenumber" : "",
      "taste" : "",
    });
    const onChange = (e) => {
      setInputValue({
        ...inputValue,
        [e.target.id] : e.target.value 
      });
    }

    const [imageFile, setImageFile] = useState(null);
    const handleImage = (event) => {
      // console.log(typeof event.target.files[0], "0310-test!!")
      setImageFile(event.target.files[0])
    }

    const [hiddenWarnText,setHiddenWarnText] = useState({
       "email" : "hidden text-red-500 text-xs italic",
       "password" : "hidden text-red-500 text-xs italic",
       "image" : "hidden text-red-500 text-xs italic",
    });

    const submitFuction = async (e) => {
        e.preventDefault()
        // 패스워드 1,2 같은지 체크
        if (inputValue["password1"] != inputValue["password2"]) {
          setHiddenWarnText({
            ...hiddenWarnText,
            ["password"] : "text-red-500 text-xs italic",
          });
          return;
        }
        // 이미지 없으면  waringText
        if (imageFile == null) {
          setHiddenWarnText({
            ...hiddenWarnText,
            ["image"] : "text-red-500 text-xs italic"
          });
          return
        }
        const formData = new FormData();
        formData.append("emal", inputValue["email"]);
        formData.append("password", inputValue["password1"]);
        formData.append("name", inputValue["name"]);
        formData.append("nickname", inputValue["nickname"]);
        formData.append("phonenumber", inputValue["phonenumber"]);
        formData.append("taste", inputValue["taste"]);
        // const tags = ["😀", "🤣", "😇"];
        // tags.forEach(tag => formData.append('tags', tag))
        // formData.append("emoji", "🤣");
        // formData.append("emoji", "😇");
        formData.append("image", imageFile); // 이미지 파일 추가
        

        for(var pair of formData.entries()) console.log(pair);  // formdata 프론트 쪽에서 확인
        
        try {
          // await axios.post('http://elice-kdt-ai-3rd-team15.koreacentral.cloudapp.azure.com/api/yamm/signup/', {	"email" : "tsest@naver.com", "password" : "tasest" })
          // .then((res)=>{
          //   console.log(res)
          // });
          await axios({
            method: "post",
            url: "http://elice-kdt-ai-3rd-team15.koreacentral.cloudapp.azure.com/api/yamm/signup/",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then((res)=>{
            console.log(res," testform res")
          })
          .catch(error => {
            console.log(error.response)
          });;
        }catch(error){
          console.log(error, "error check signup - testform.js")
        }
        
        
    }
  
    return (
        <div className="flex justify-center mt-20">
            <div className="w-5/6">
                <form onSubmit={submitFuction} className="bg-white h-3/6 shadow-md rounded px-8 pt-6 pb-8 mb-4 overflow-scroll">
                    
                    <div className="mb-4">
                      <label className="block after:content-['*'] after:ml-0.5 after:text-red-500 text-gray-700 text-sm font-bold mb-2"  htmlFor="username">
                        이메일
                      </label>
                      <input onChange={onChange} className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none  focus:border-yellow1 focus:ring-yellow1 focus:border-2 focus:shadow-outline" id="email" type="text" placeholder="yammm@gamil.com"></input>
                      <p className={hiddenWarnText["email"]}>이메일은 필수 입력 사항 입니다</p>
                    </div>

                    <div className="mb-4">
                      <label className="block after:content-['*'] after:ml-0.5 after:text-red-500 text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        패스워드
                      </label>
                      <input onChange={onChange} className="shadow appearance-none border focus:outline-none focus:border-yellow1 focus:ring-yellow1 focus:border-2 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:shadow-outline" id="password1" type="password" placeholder="******************"></input>
                      <p className={hiddenWarnText["password"]}>비밀번호는 필수 입력 사항 입니다</p>
                    </div>

                    <div className="mb-4">
                      <label className="block after:content-['*'] after:ml-0.5 after:text-red-500 text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        패스워드 확인
                      </label>
                      <input onChange={onChange} className="shadow appearance-none border focus:outline-none focus:border-yellow1 focus:ring-yellow1 focus:border-2 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:shadow-outline" id="password2" type="password" placeholder="******************"></input>
                      <p className={hiddenWarnText["password"]}>비밀번호 확인은 필수 입력 사항 입니다</p>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        이름
                      </label>
                      <input onChange={onChange} className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:border-yellow1 focus:ring-yellow1 focus:border-2  focus:shadow-outline" id="name" type="text" placeholder="000" ></input>
                    </div>

                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        별명
                      </label>
                      <input onChange={onChange} className="shadow appearance-none border focus:border-yellow1 focus:ring-yellow1 focus:border-2  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="nickname" type="text" placeholder="nickname"></input>
                    </div>

                    <div className="mb-4">
                      <label className="block after:content-['*'] after:ml-0.5 after:text-red-500 text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        사진
                      </label>
                      <input onChange={handleImage} className="shadow appearance-none border focus:border-yellow1 focus:ring-yellow1 focus:border-2 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="image" type="file" placeholder="사진을 입력해 주세요"></input>
                      <p className={hiddenWarnText['image']}>사진을 넣어 주세요</p>
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        음식 취향
                      </label>
                      <input onChange={onChange} className="shadow appearance-none border focus:border-yellow1 focus:ring-yellow1 focus:border-2  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="taste" type="text" placeholder="ex) 한식, 중식, 일식"></input>
                      
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        휴대폰 번호
                      </label>
                      <input onChange={onChange} className="shadow appearance-none border focus:border-yellow1 focus:ring-yellow1 focus:border-2  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="phonenumber" type="text" placeholder="000-0000-0000"></input>
                      
                    </div>
                    


                    <div className="flex items-center justify-center ">
                      <button className="bg-yellow1 hover:bg-green1 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        회원가입
                      </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TestForm;