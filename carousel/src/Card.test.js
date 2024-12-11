import { render } from '@testing-library/react'
import Card from './CArd'

it('renders Card', () => {
  render(<Card
    caption="Test Image"
    src="https://via.placeholder.com/150"
    currNum={1}
    totalNum={3}
  />)
})

it('matches Card snapshot', () => {
  const { asFragment } = render(
    <Card
      caption="Test Image"
      src="https://via.placeholder.com/150"
      currNum={1}
      totalNum={3}
    />
  )
  expect(asFragment().toMatchSnapshot())
})