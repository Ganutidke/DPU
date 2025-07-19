import type { SVGProps } from "react";

export const Icons = {
  logo: (props: SVGProps<SVGSVGElement>) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 200 200"
      {...props}>
      <defs>
        <style>{`.cls-1{fill:#c8102e;}.cls-2{fill:#f1be48;}`}</style>
      </defs>
      <path className="cls-1" d="M165.7,50.31v50c-15.42,0-27.9,12.48-27.9,27.9s12.48,27.9,27.9,27.9h0v16.1H34.3V50.31Z"/>
      <path className="cls-2" d="M100.23,37.36a28.06,28.06,0,0,0-28,27.9,27.75,27.75,0,0,0,6.1,17.4c5.4,6,13,9.8,21.9,9.8s16.5-3.8,21.9-9.8a27.75,27.75,0,0,0,6.1-17.4A28,28,0,0,0,100.23,37.36Z"/>
      <path className="cls-2" d="M165.7,34.3v.4h0a27.9,27.9,0,1,0,0,55.8h0v.4h-16.1a27.75,27.75,0,0,0-9.8-21.9c-6-5.4-9.8-13-9.8-21.9s3.8-16.5,9.8-21.9a27.75,27.75,0,0,0,9.8-21.9Z"/>
      <path className="cls-1" d="M100,50.31A15,15,0,1,1,85,65.28,15,15,0,0,1,100,50.31Z"/>
      <path className="cls-1" d="M150.7,50.31a15,15,0,1,0,15,15A15,15,0,0,0,150.7,50.31Z"/>
    </svg>
  ),
};
