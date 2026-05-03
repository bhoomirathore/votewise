import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import VoterGuide from '../components/VoterGuide'

describe('VoterGuide Component', () => {
  it('renders all 5 steps', () => {
    render(<VoterGuide />)
    expect(screen.getAllByText(/Check Your Eligibility/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Register on the Voter List/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Find Your Polling Booth/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Cast Your Vote/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Verify Your Vote/i).length).toBeGreaterThan(0)
  })

  it('shows progress bar', () => {
    render(<VoterGuide />)
    expect(screen.getAllByText(/Your Progress/i).length).toBeGreaterThan(0)
  })

  it('updates progress when step is checked', () => {
    render(<VoterGuide />)
    const checkboxes = screen.getAllByRole('checkbox')
    fireEvent.click(checkboxes[0])
    expect(screen.getByText(/1\/5 steps/i)).toBeInTheDocument()
  })

  it('renders reset button', () => {
    render(<VoterGuide />)
    expect(screen.getByText(/Reset/i)).toBeInTheDocument()
  })
})
