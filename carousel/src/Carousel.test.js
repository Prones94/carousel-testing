import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

it("works when you click on the right arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});

// Smoke Test
it('renders Carousel', () => {
  render(<Carousel
    photos={TEST_IMAGES}
    title="Smoke Test for Carousel"
  />)
})

// Snapshot Test
it('matches Carousel snapshot', () => {
  const { asFragment } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="Sample Carousel Images"
    />
  )
  expect(asFragment()).toMatchSnapshot()
})

describe("Carousel Component", () => {
  it("left and right arrows should not do the same thing", () => {
    const { getByText, container } = render(
      <Carousel photos={TEST_IMAGES} title="Test Carousel" />
    )

    const rightArrow = container.querySelector(".bi-arrow-right-circle")
    fireEvent.click(rightArrow)

    expect(getByText("testing image 2")).toBeInTheDocument()

    const leftArrow = container.querySelector(".bi-arrow-left-circle")
    fireEvent.click(leftArrow)

    expect(getByText("testing image 1")).toBeInTheDocument()
  })

  it("left arrow moves to the previous image", () => {
    const { getByText, container } = render(
      <Carousel photos={TEST_IMAGES} title="Test Carousel" />
    )

    const rightArrow = container.querySelector(".bi-arrow-right-circle")
    fireEvent.click(rightArrow)
    expect(getByText("testing image 2")).toBeInTheDocument()
    const leftArrow = container.querySelector(".bi-arrow-left-circle")
    fireEvent.click(leftArrow)

    expect(getByText("testing image 1")).toBeInTheDocument()
  })
})

describe("Carousel Arrows Visibility", () => {
  it("hides the left arrow on the first image", () => {
    const { container } = render(
      <Carousel photos={TEST_IMAGES} title="Test Carousel" />
    )

    const leftArrow = container.querySelector(".bi-arrow-left-circle")
    expect(leftArrow).not.toBeInTheDocument()
  })

  it("hides the arrow on the last image", () => {
    const { container } = render(
      <Carousel photos={TEST_IMAGES} title="Test Carousel" />
    )
    const rightArrow = container.query(".bi-arrow-right-circle")
    fireEvent.click(rightArrow)
    fireEvent.click(rightArrow)

    expect(rightArrow).not.toBeInTheDocument()
  })
})