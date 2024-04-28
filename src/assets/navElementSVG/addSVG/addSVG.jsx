export default function addSVG(props){
    return (
        <>
            <svg width="30" height="30" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="17" cy="17" r="16.25" fill={props.fill} stroke="black" strokeWidth="1.5"/>
                <path d="M8.09521 17H25.0952" stroke={props.cross} strokeWidth="1.5"/>
                <path d="M17 25.0952V8.09521" stroke={props.cross} strokeWidth="1.5"/>
            </svg>
        </>
    )
}
