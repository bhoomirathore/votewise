import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ElectionTimeline from '../components/ElectionTimeline'

describe('ElectionTimeline Component', () => {
  it('renders the timeline title', () => {
    render(<ElectionTimeline />)
    expect(screen.getByRole('heading', { name: /Election Timeline Explorer/i })).toBeInTheDocument()
  })

  it('renders all 7 stages', () => {
    render(<ElectionTimeline />)
    expect(screen.getByText(/Election Announcement/i)).toBeInTheDocument()
    expect(screen.getByText(/Voter Roll Finalization/i)).toBeInTheDocument()
    expect(screen.getByText(/Voting Day/i)).toBeInTheDocument()
    expect(screen.getByText(/Oath Taking/i)).toBeInTheDocument()
  })

  it('expands stage when clicked', () => {
    render(<ElectionTimeline />)
    const announcementBtn = screen.getAllByRole('button').find(b => b.textContent.includes('Election Announcement'))
    fireEvent.click(announcementBtn)
    expect(screen.getAllByText(/What Happens/i).length).toBeGreaterThan(0)
  })
})
