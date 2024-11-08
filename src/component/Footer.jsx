import React from "react";
import { Footer } from "flowbite-react";

export function Footercomponent() {
  return (
    <div>
      <Footer container>
        <Footer.Copyright
          href="#"
          by="Designed and Developed by Lalit Chaudhari"
          year={2024}
        />
        <Footer.LinkGroup>
          <Footer.Link
            href="https://lalitchaudhariportfolio.netlify.app/"
            target="_blank"
          >
            About
          </Footer.Link>
          <Footer.Link href="https://github.com/luc97500" target="_blank">
            Github
          </Footer.Link>
          <Footer.Link
            href="https://www.linkedin.com/in/lalit-chaudhari-129389216/"
            target="_blank"
          >
            Linkedin
          </Footer.Link>
        </Footer.LinkGroup>
      </Footer>
    </div>
  );
}
