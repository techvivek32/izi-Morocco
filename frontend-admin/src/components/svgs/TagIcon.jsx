import React from 'react'

const TagIcon = ({ variant = "light", className = "" }) => {
    const fill = variant === "light" ? "#ffffff" : "var(--color-accent)";
    return (
        <svg fill={fill} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 32 32" xmlSpace="preserve" height="24px"
            width="24px">
            <polygon style={{ fill: "none", stroke: fill, strokeWidth: 2, strokeMiterlimit: 10 }} points="24,14 24,5 15,5 4,16 13,25 " />
            <polyline style={{ fill: "none", stroke: fill, strokeWidth: 2, strokeMiterlimit: 10 }} points="15.546,26.053 17.493,28 28,17.589 28,8 
	26,8 "/>
            <circle cx="20" cy="9" r="1" />
        </svg>
    )
}

export default TagIcon
