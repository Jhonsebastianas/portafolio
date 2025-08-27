"use client";
import styled from "styled-components";
import Image from "next/image";

const Title = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
  transition: transform 0.35s ease;
`;

const SubTitle = styled.h4`
  font-size: 1rem;
  font-weight: 500;
  color: #666;
  margin: 0 0 0.5rem 0;
  transition: transform 0.35s ease;
`;

const Description = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  color: #444;
  margin: 0;
  opacity: 0;
  max-height: 0;
  overflow: hidden;
  transform: translateY(8px);
  transition: all 0.35s ease;
`;

const Button = styled.a`
  display: inline-block;
  background: #111;
  color: #fff;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 0.75rem 1.25rem;
  border-radius: 12px;
  text-decoration: none;
  margin-top: 1rem;

  opacity: 0;
  max-height: 0;
  overflow: hidden;
  transform: translateY(8px);
  transition: all 0.35s ease;

  &:hover {
    background: #333;
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 24px;
  padding: 2rem;
  background: ${(props) => props.bg || "#f3f3f3"};
  color: #111;
  width: 100%;
  max-width: 550px;
  min-height: 820px;
  position: relative;
  overflow: hidden;
  cursor: pointer;

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 1.5rem;
    min-height: 400px;
  }

  /* Hover effect: reveal hidden content */
  &:hover {
    & ${Title}, & ${SubTitle} {
      transform: translateY(-25px);
    }

    & ${Description}, & ${Button} {
      opacity: 1;
      max-height: 200px;
      transform: translateY(0);
    }
  }
`;

const ImageWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;

  img {
    max-width: 90%;
    height: auto;
    border-radius: 12px;
  }

  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
`;

export default function CardWrapper({
  title,
  subtitle,
  description,
  image,
  bg,
  link,
}) {
  return (
    <CardContainer bg={bg}>
      <ImageWrapper>
        <Image src={image} alt={title} width={350} height={200} />
      </ImageWrapper>

      <Content>
        <Title>{title || ""}</Title>
        {subtitle && <SubTitle>{subtitle}</SubTitle>}
        <Description>{description}</Description>
        <Button href={link} rel="noopener noreferrer">
          Explore ↗
        </Button>
      </Content>
    </CardContainer>
  );
}
