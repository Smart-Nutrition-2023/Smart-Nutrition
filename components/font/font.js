const Font = ({ children, color, marginTop, textSize }) => {
    const fontcss= 'font-["Jalnan"] ' + `${color+" "} + ${textSize}`;
    return (
        <div className={fontcss}>{children}</div>
    );
};

export default Font;