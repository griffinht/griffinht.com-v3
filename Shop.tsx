import { css } from 'hono/css'

const shopContainerClass = css`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`

const productGridClass = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  padding: 2rem;
`

const productCardClass = css`
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`

const cursorPreviewClass = css`
  width: 100px;
  height: 100px;
  margin: 0 auto 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
`

const buttonClass = css`
  background: #7c3aed;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  font-size: 1.1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;
  
  &:hover {
    background: #6d28d9;
  }
`

const cursorItems = [
  {
    id: 1,
    name: "Rainbow Trail",
    description: "Leave a magical rainbow trail as you move your cursor",
    price: "$4.99",
    preview: "🌈"
  },
  {
    id: 2,
    name: "Sparkle Effect",
    description: "Sprinkle sparkles with every click",
    price: "$3.99",
    preview: "✨"
  },
  {
    id: 3,
    name: "Neon Glow",
    description: "Make your cursor glow with neon colors",
    price: "$5.99",
    preview: "💫"
  },
  {
    id: 4,
    name: "Pixel Trail",
    description: "Leave a retro pixel trail behind your cursor",
    price: "$4.99",
    preview: "👾"
  }
]

const Shop = () => {
  return (
    <div class={shopContainerClass}>
      <h1>Cursor Cosmetics Shop</h1>
      
      <div class={productGridClass}>
        {cursorItems.map(item => (
          <div class={productCardClass} key={item.id}>
            <div class={cursorPreviewClass}>
              {item.preview}
            </div>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p style="font-size: 1.5rem; font-weight: bold; margin: 1rem 0;">
              {item.price}
            </p>
            <button class={buttonClass}>
              Purchase
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Shop
