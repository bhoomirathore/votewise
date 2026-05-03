import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Quiz from '../components/Quiz'

describe('Quiz Component', () => {
  it('renders the quiz title correctly', () => {
    render(<Quiz />)
    expect(screen.getByRole('heading', { name: /Test Your Knowledge/i })).toBeInTheDocument()
  })

  it('renders all 3 difficulty level cards', () => {
    render(<Quiz />)
    expect(screen.getByText('Beginner')).toBeInTheDocument()
    expect(screen.getByText('Intermediate')).toBeInTheDocument()
    expect(screen.getByText('Advanced')).toBeInTheDocument()
  })

  it('starts quiz when difficulty card is clicked', () => {
    render(<Quiz />)
    fireEvent.click(screen.getByText('Beginner'))
    expect(screen.getByText(/Question/i)).toBeInTheDocument()
  })

  it('shows explanation after answer is selected', () => {
    render(<Quiz />)
    fireEvent.click(screen.getByText('Beginner'))
    const options = screen.getAllByRole('button')
    fireEvent.click(options[1])
    expect(screen.getByText(/Explanation/i)).toBeInTheDocument()
  })
})
