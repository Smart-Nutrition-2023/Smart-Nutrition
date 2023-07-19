import Font from './font';

const FontTitle = ({ marginTop, textSize}) => {
  const fontcss= 'flex justify-center '+ marginTop;
  return (
        <div className={fontcss}>
          <Font color="text-black" textSize={textSize}>스마트</Font>
          <Font color="text-red1" textSize={textSize}>-</Font>
          <Font color="text-yellow1" textSize={textSize}>-</Font>
          <Font color="text-green1" textSize={textSize}>-</Font>
          <Font color="text-black" textSize={textSize}>뉴트리션</Font>
        </div>
    );
};

export default FontTitle;