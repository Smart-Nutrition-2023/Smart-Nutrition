import Image from "next/image";
import { format } from "date-fns";
const FoodItem = ({ foodData }) => {

    
    let date = new Date(foodData["date"]);
    let formatDate = format(date, "yyyy do H:mma");
    return (

        <div className="flex">
            {console.log(foodData)}
            <div className="w-2/6 mt-2  flex flex-col items-center justify-center">
                    <div className=" col-span-1 rounded-full  w-4/6 min-h-[50px] min-w-[50px]  flex justify-center items-center relative" >
                      <Image src="/yellowsmile.svg" layout="fill" />
                    </div>
                    <div className="flexitems-center justify-center text-xs mt-1" >
                      <div>{formatDate}</div>
                    </div>
                    <div className="flexitems-center justify-center text-xs" >
                      <div>좋아요</div>
                    </div>
            </div>
            
            <div className='w-4/6 flex justify-end mt-2'>
                <div className="rounded-2xl w-2/3 h-full relative min-h-[150px] bg-blue-500">
                    <Image className={'rounded-2xl shadow-2xl'} src={foodData["img"]} layout="fill" />
                </div>
            </div>
        </div>
    );
};

export default FoodItem;