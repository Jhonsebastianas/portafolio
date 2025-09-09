import { useState } from "react";
import styled from "styled-components";

const MenuWrapper = styled.div`
  flex: none;
  height: auto;
  left: 50%;
  position: fixed;
  top: 0;
  transform: translate(-50%);
  width: 100%;
  z-index: 9;
`;

const MenuContainer = styled.div`
  backdrop-filter: none;
  background-color: rgba(0, 0, 0, 0);
  width: 100%;
  opacity: 1;

  align-content: center;
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  height: min-content;
  justify-content: space-between;
  overflow: visible;
  padding: 0;
  position: relative;
`;

const MenuContent = styled.div`
  --13v8ckf: 12px 20px 12px 16px;
  opacity: 1;
  align-content: center;
  align-items: center;
  display: flex;
  flex: 1 0 0px;
  flex-direction: row;
  flex-wrap: nowrap;
  height: min-content;
  justify-content: space-between;
  overflow: visible;
  padding: 12px 28px;
  position: relative;
  width: 1px;
`;

const MenuLeft = styled.div`
  opacity: 1;
  align-content: center;
  align-items: center;
  display: flex;
  flex: none;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 40px;
  height: min-content;
  justify-content: flex-start;
  overflow: visible;
  padding: 0;
  position: relative;
  width: min-content;
`;

const MenuLeftItem = styled.div`
  outline: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-shrink: 0;
  --extracted-gdpscs: var(--first-color);
  --framer-paragraph-spacing: 0px;
  transform: none;
  opacity: 1;
  will-change: auto;

  opacity: ${(props) => (props.active ? 1 : 0.5)};

  flex: none;
  height: auto;
  position: relative;
  white-space: pre;
  width: auto;
`;

const MenuLeftItemH1 = styled.h1`
  font-family: "Roobert SemiBold", sans-serif;
  --font-selector: Q1VTVE9NO1Jvb2JlcnQgU2VtaUJvbGQ =;
  --framer-font-family: "Roobert SemiBold", "Roobert SemiBold Placeholder",
    sans-serif;

  --framer-text-color: ${(props) =>
    props.active ? "var(--extracted-gdpscs, var(--first-color))" : "#000"};

  background-color: var(
    --framer-blockquote-text-background-color,
    var(--framer-text-background-color, initial)
  );
  border-radius: var(
    --framer-blockquote-text-background-radius,
    var(--framer-text-background-radius, initial)
  );
  padding: var(
    --framer-blockquote-text-background-padding,
    var(--framer-text-background-padding, initial)
  );

  font-family: var(
    --framer-blockquote-font-family,
    var(--framer-font-family, Inter, Inter Placeholder, sans-serif)
  );
  font-style: var(
    --framer-blockquote-font-style,
    var(--framer-font-style, normal)
  );
  font-weight: var(
    --framer-blockquote-font-weight,
    var(--framer-font-weight, 400)
  );
  color: var(--framer-blockquote-text-color, var(--framer-text-color, #000));
  font-size: calc(
    var(--framer-blockquote-font-size, var(--framer-font-size, 16px)) *
      var(--framer-font-size-scale, 1)
  );
  letter-spacing: var(
    --framer-blockquote-letter-spacing,
    var(--framer-letter-spacing, 0)
  );
  text-transform: var(
    --framer-blockquote-text-transform,
    var(--framer-text-transform, none)
  );
  text-decoration-line: var(
    --framer-blockquote-text-decoration,
    var(--framer-text-decoration, initial)
  );
  text-decoration-style: var(
    --framer-blockquote-text-decoration-style,
    var(--framer-text-decoration-style, initial)
  );
  text-decoration-color: var(
    --framer-blockquote-text-decoration-color,
    var(--framer-text-decoration-color, initial)
  );
  text-decoration-thickness: var(
    --framer-blockquote-text-decoration-thickness,
    var(--framer-text-decoration-thickness, initial)
  );
  text-decoration-skip-ink: var(
    --framer-blockquote-text-decoration-skip-ink,
    var(--framer-text-decoration-skip-ink, initial)
  );
  text-underline-offset: var(
    --framer-blockquote-text-decoration-offset,
    var(--framer-text-decoration-offset, initial)
  );
  line-height: var(
    --framer-blockquote-line-height,
    var(--framer-line-height, 1.2em)
  );
  text-align: var(
    --framer-blockquote-text-alignment,
    var(--framer-text-alignment, start)
  );
  -webkit-text-stroke-width: var(--framer-text-stroke-width, initial);
  -webkit-text-stroke-color: var(--framer-text-stroke-color, initial);
  font-feature-settings: var(--framer-font-open-type-features, initial);
  font-variation-settings: var(--framer-font-variation-axes, normal);
  text-wrap: var(--framer-text-wrap-override, var(--framer-text-wrap));

  margin: 0px;

  display: block;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  unicode-bidi: isolate;
`;

const MenuLeftItemA = styled.a`
  --framer-link-current-text-decoration: underline;
  --framer-link-hover-text-decoration: none;
  --framer-link-text-decoration: none;

  text-decoration-line: var(
    --framer-blockquote-text-decoration,
    var(--framer-link-text-decoration, var(--framer-text-decoration, initial))
  );
  text-decoration-style: var(
    --framer-blockquote-text-decoration-style,
    var(
      --framer-link-text-decoration-style,
      var(--framer-text-decoration-style, initial)
    )
  );
  text-decoration-color: var(
    --framer-blockquote-text-decoration-color,
    var(
      --framer-link-text-decoration-color,
      var(--framer-text-decoration-color, initial)
    )
  );
  text-decoration-thickness: var(
    --framer-blockquote-text-decoration-thickness,
    var(
      --framer-link-text-decoration-thickness,
      var(--framer-text-decoration-thickness, initial)
    )
  );
  text-decoration-skip-ink: var(
    --framer-blockquote-text-decoration-skip-ink,
    var(
      --framer-link-text-decoration-skip-ink,
      var(--framer-text-decoration-skip-ink, initial)
    )
  );
  text-underline-offset: var(
    --framer-blockquote-text-decoration-offset,
    var(
      --framer-link-text-decoration-offset,
      var(--framer-text-decoration-offset, initial)
    )
  );

  font-family: var(
    --framer-blockquote-font-family,
    var(
      --framer-link-font-family,
      var(--framer-font-family, Inter, Inter Placeholder, sans-serif)
    )
  );
  font-style: var(
    --framer-blockquote-font-style,
    var(--framer-link-font-style, var(--framer-font-style, normal))
  );
  font-weight: var(
    --framer-blockquote-font-weight,
    var(--framer-link-font-weight, var(--framer-font-weight, 400))
  );
  color: var(
    --framer-blockquote-text-color,
    var(--framer-link-text-color, var(--framer-text-color, #000))
  );
  font-size: calc(
    var(--framer-blockquote-font-size, var(--framer-font-size, 16px)) *
      var(--framer-font-size-scale, 1)
  );
  text-transform: var(
    --framer-blockquote-text-transform,
    var(--framer-link-text-transform, var(--framer-text-transform, none))
  );
  cursor: var(--framer-custom-cursors, pointer);
  background-color: var(--framer-link-text-background-color, initial);
  border-radius: var(--framer-link-text-background-radius, initial);
  padding: var(--framer-link-text-background-padding, initial);
`;

const MenuCenter = styled.a`
  opacity: 0;
  transform: translate(-50%, -50%);
  will-change: transform;

  aspect-ratio: 1 / 1;
  flex: none;
  height: var(--framer-aspect-ratio-supported, 32px);
  left: 50%;
  overflow: visible;
  position: absolute;
  text-decoration: none;
  top: 49%;
  width: 32px;

  display: block;
`;

const MenuCenterContainer = styled.div`
  position: absolute;
  border-radius: inherit;
  inset: 0px;
`;

const MenuCenterImg = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  object-position: center center;
  object-fit: cover;
`;

const MenuRight = styled.div`
  opacity: 1;

  align-content: center;
  align-items: center;
  display: flex;
  flex: none;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 20px;
  height: min-content;
  justify-content: flex-start;
  overflow: visible;
  padding: 0;
  position: relative;
  width: min-content;
`;

const MenuRightCTAButton = styled.a`
  background-color: rgb(255, 255, 255);
  opacity: 1;
  border-radius: 200px;

  align-content: center;
  align-items: center;
  display: flex;
  flex: none;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 4px;
  height: min-content;
  justify-content: center;
  overflow: visible;
  padding: 6px 16px 8px;
  position: relative;
  text-decoration: none;
  width: min-content;
`;

const MenuRightCTAContent = styled.div`
  outline: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-shrink: 0;
  --framer-paragraph-spacing: 0px;
  transform: none;
  opacity: 1;

  flex: none;
  height: auto;
  position: relative;
  white-space: pre;
  width: auto;
`;

const MenuRightCTAText = styled.p`
  --font-selector: Q1VTVE9NO1Jvb2JlcnQgU2VtaUJvbGQ =;
  --framer-font-family: "Roobert SemiBold", "Roobert SemiBold Placeholder",
    sans-serif;

  background-color: var(
    --framer-blockquote-text-background-color,
    var(--framer-text-background-color, initial)
  );
  border-radius: var(
    --framer-blockquote-text-background-radius,
    var(--framer-text-background-radius, initial)
  );
  padding: var(
    --framer-blockquote-text-background-padding,
    var(--framer-text-background-padding, initial)
  );

  font-family: var(
    --framer-blockquote-font-family,
    var(--framer-font-family, Inter, Inter Placeholder, sans-serif)
  );
  font-style: var(
    --framer-blockquote-font-style,
    var(--framer-font-style, normal)
  );
  font-weight: var(
    --framer-blockquote-font-weight,
    var(--framer-font-weight, 400)
  );
  color: var(--framer-blockquote-text-color, var(--framer-text-color, #000));
  font-size: calc(
    var(--framer-blockquote-font-size, var(--framer-font-size, 16px)) *
      var(--framer-font-size-scale, 1)
  );
  letter-spacing: var(
    --framer-blockquote-letter-spacing,
    var(--framer-letter-spacing, 0)
  );
  text-transform: var(
    --framer-blockquote-text-transform,
    var(--framer-text-transform, none)
  );
  text-decoration-line: var(
    --framer-blockquote-text-decoration,
    var(--framer-text-decoration, initial)
  );
  text-decoration-style: var(
    --framer-blockquote-text-decoration-style,
    var(--framer-text-decoration-style, initial)
  );
  text-decoration-color: var(
    --framer-blockquote-text-decoration-color,
    var(--framer-text-decoration-color, initial)
  );
  text-decoration-thickness: var(
    --framer-blockquote-text-decoration-thickness,
    var(--framer-text-decoration-thickness, initial)
  );
  text-decoration-skip-ink: var(
    --framer-blockquote-text-decoration-skip-ink,
    var(--framer-text-decoration-skip-ink, initial)
  );
  text-underline-offset: var(
    --framer-blockquote-text-decoration-offset,
    var(--framer-text-decoration-offset, initial)
  );
  line-height: var(
    --framer-blockquote-line-height,
    var(--framer-line-height, 1.2em)
  );
  text-align: var(
    --framer-blockquote-text-alignment,
    var(--framer-text-alignment, start)
  );
  -webkit-text-stroke-width: var(--framer-text-stroke-width, initial);
  -webkit-text-stroke-color: var(--framer-text-stroke-color, initial);
  font-feature-settings: var(--framer-font-open-type-features, initial);
  font-variation-settings: var(--framer-font-variation-axes, normal);
  text-wrap: var(--framer-text-wrap-override, var(--framer-text-wrap));
`;

const MenuRightAvailable = styled.a`
  opacity: 1;
  align-content: center;
  align-items: center;
  display: flex;
  flex: none;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 8px;
  height: min-content;
  justify-content: flex-start;
  overflow: visible;
  padding: 0;
  position: relative;
  text-decoration: none;
  width: min-content;
`;

const MenuRightAvailableSignal = styled.div`
  background-color: var(
    --token-b30c7bc2-6850-412a-ac74-52a8c90b9ae9,
    rgb(0, 245, 107)
  );
  opacity: 1;
  border-radius: 100%;

  aspect-ratio: 1 / 1;
  flex: none;
  height: var(--framer-aspect-ratio-supported, 8px);
  position: relative;
  width: 8px;
`;

const MenuRightAvailableButton = styled.div`
  outline: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-shrink: 0;
  --framer-paragraph-spacing: 0px;
  opacity: 0.5;
  transform: none;
  will-change: auto;
  --extracted-r6o4lv: 0;

  flex: none;
  height: auto;
  position: relative;
  white-space: pre;
  width: auto;
`;

const MenuRightAvailableText = styled.p`
  --font-selector: Q1VTVE9NO1Jvb2JlcnQgUmVndWxhcg ==;
  --framer-font-family: "Roobert Regular", "Roobert Regular Placeholder",
    sans-serif;
  --framer-font-size: 12px;

  background-color: var(
    --framer-blockquote-text-background-color,
    var(--framer-text-background-color, initial)
  );
  border-radius: var(
    --framer-blockquote-text-background-radius,
    var(--framer-text-background-radius, initial)
  );
  padding: var(
    --framer-blockquote-text-background-padding,
    var(--framer-text-background-padding, initial)
  );

  font-family: var(
    --framer-blockquote-font-family,
    var(--framer-font-family, Inter, Inter Placeholder, sans-serif)
  );
  font-style: var(
    --framer-blockquote-font-style,
    var(--framer-font-style, normal)
  );
  font-weight: var(
    --framer-blockquote-font-weight,
    var(--framer-font-weight, 400)
  );
  color: var(--framer-blockquote-text-color, var(--framer-text-color, #000));
  font-size: calc(
    var(--framer-blockquote-font-size, var(--framer-font-size, 16px)) *
      var(--framer-font-size-scale, 1)
  );
  letter-spacing: var(
    --framer-blockquote-letter-spacing,
    var(--framer-letter-spacing, 0)
  );
  text-transform: var(
    --framer-blockquote-text-transform,
    var(--framer-text-transform, none)
  );
  text-decoration-line: var(
    --framer-blockquote-text-decoration,
    var(--framer-text-decoration, initial)
  );
  text-decoration-style: var(
    --framer-blockquote-text-decoration-style,
    var(--framer-text-decoration-style, initial)
  );
  text-decoration-color: var(
    --framer-blockquote-text-decoration-color,
    var(--framer-text-decoration-color, initial)
  );
  text-decoration-thickness: var(
    --framer-blockquote-text-decoration-thickness,
    var(--framer-text-decoration-thickness, initial)
  );
  text-decoration-skip-ink: var(
    --framer-blockquote-text-decoration-skip-ink,
    var(--framer-text-decoration-skip-ink, initial)
  );
  text-underline-offset: var(
    --framer-blockquote-text-decoration-offset,
    var(--framer-text-decoration-offset, initial)
  );
  line-height: var(
    --framer-blockquote-line-height,
    var(--framer-line-height, 1.2em)
  );
  text-align: var(
    --framer-blockquote-text-alignment,
    var(--framer-text-alignment, start)
  );
  -webkit-text-stroke-width: var(--framer-text-stroke-width, initial);
  -webkit-text-stroke-color: var(--framer-text-stroke-color, initial);
  font-feature-settings: var(--framer-font-open-type-features, initial);
  font-variation-settings: var(--framer-font-variation-axes, normal);
  text-wrap: var(--framer-text-wrap-override, var(--framer-text-wrap));

  margin: 0px;
`;

const Menu = () => {
  const [activeItem, setActiveItem] = useState("hero");

  const handleClick = async (section) => {
    const { gsap } = await import("gsap");
    const { ScrollToPlugin } = await import("gsap/ScrollToPlugin");

    gsap.registerPlugin(ScrollToPlugin);

    setActiveItem(section);

    gsap.to(window, {
      duration: 1.2,
      scrollTo: {
        y: section.toLowerCase() === "hero" ? 0 : `#${section.toLowerCase()}`,
      },
      ease: "power2.inOut",
    });
  };

  return (
    <MenuWrapper>
      <MenuContainer>
        <MenuContent>
          <MenuLeft>
            <MenuLeftItem active={activeItem == "hero"}>
              <MenuLeftItemH1 active={activeItem == "hero"}>
                <MenuLeftItemA onClick={() => handleClick("hero")}>
                  Sebastian Agudelo
                </MenuLeftItemA>
              </MenuLeftItemH1>
            </MenuLeftItem>
            <MenuLeftItem active={activeItem == "about"}>
              <MenuLeftItemH1 active={activeItem == "about"}>
                <MenuLeftItemA onClick={() => handleClick("about")}>
                  About
                </MenuLeftItemA>
              </MenuLeftItemH1>
            </MenuLeftItem>
          </MenuLeft>
          <MenuCenter>
            <MenuCenterContainer>
              <MenuCenterImg src="/images/logo.svg" />
            </MenuCenterContainer>
          </MenuCenter>
          <MenuRight>
            <MenuRightCTAButton>
              <MenuRightCTAContent>
                <MenuRightCTAText>Book a spot</MenuRightCTAText>
              </MenuRightCTAContent>
            </MenuRightCTAButton>
            <MenuRightAvailable>
              <MenuRightAvailableSignal />
              <MenuRightAvailableButton>
                <MenuRightAvailableText>Available</MenuRightAvailableText>
              </MenuRightAvailableButton>
            </MenuRightAvailable>
          </MenuRight>
        </MenuContent>
      </MenuContainer>
    </MenuWrapper>
  );
};

export default Menu;
