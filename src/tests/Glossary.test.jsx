import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Glossary from '../components/Glossary'

describe('Glossary Component', () => {
  it('renders the glossary title', () => {
    render(<Glossary />)
    expect(screen.getByText(/Glossary/i)).toBeInTheDocument()
  })

  it('shows all 20 terms by default', () => {
    render(<Glossary />)
    expect(screen.getByText(/Showing 20 of 20/i)).toBeInTheDocument()
  })

  it('filters terms when searching', () => {
    render(<Glossary />)
    const searchInput = screen.getByPlaceholderText(/Search/i)
    fireEvent.change(searchInput, { target: { value: 'EVM' } })
    expect(screen.getAllByText(/EVM/i).length).toBeGreaterThan(0)
  })

  it('filters terms by letter', () => {
    render(<Glossary />)
    fireEvent.click(screen.getByText('E'))
    expect(screen.getAllByText(/ECI/i).length).toBeGreaterThan(0)
  })
})
