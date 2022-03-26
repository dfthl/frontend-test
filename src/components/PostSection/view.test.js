import '@testing-library/jest-dom';
import { act, render, screen } from "@testing-library/react";
import apiClient from "../../http-common";
import userEvent from '@testing-library/user-event';
import PostSection from '../PostSection/view';

// Test query DOM case.
test('PostSection Title', () => {
    render(<PostSection />);
    const linkElement = screen.getByText(/React Axios POST/i);
    expect(linkElement).toBeInTheDocument();
});
test('PostSection Post Button', () => {
    render(<PostSection />);
    const linkElement = screen.getByText(/Post Data/i);
    expect(linkElement).toBeInTheDocument();
});
test('PostSection Clear Post Button', () => {
    render(<PostSection />);
    const linkElement = screen.getByText(/Clear/i);
    expect(linkElement).toBeInTheDocument();
});
// Test User Action case
test('Render Input', () => {
    const testTitle = "judul";
    const testDescription = "deskripsi";

    render(<PostSection />);
    const inputTitle = screen.getByTestId('title-input');
    const inputDescription = screen.getByTestId('description-input');

    userEvent.type(inputTitle, testTitle)
    userEvent.type(inputDescription, testDescription)

    const titleElement = screen.getByText(/judul/i);
    const descriptionElement = screen.getByText(/deskripsi/i);
    
    expect(titleElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
})
test('Render Post Button Clicked', () => {

    render(<PostSection />)
    userEvent.click(screen.getByText('Post Data'));
    expect(screen.getByTestId('postdata-button')).toBeCalled
})
test('Render Clear Post Button Clicked', () => {

    render(<PostSection />)
    userEvent.click(screen.getByText('Clear'));
    expect(screen.getByTestId('clear-button')).toBeCalled
})
// Test API Call case
