import React from "react";
import styled from "styled-components";

export const Footer = () => {
  return (
    <FooterWrapper className="mt-20">
      <FooterMaxWidth>
        <p className="font-bold text-gray-400 text-center">
          Built with &hearts; React{" "}
        </p>
      </FooterMaxWidth>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.div``;
const FooterMaxWidth = styled.div``;
