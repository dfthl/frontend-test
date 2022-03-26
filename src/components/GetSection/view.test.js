import '@testing-library/jest-dom';
import { act, render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import GetSection from "./view";
import axios from 'axios';

jest.mock('axios');
// Test query DOM case
test('GetSection Title', () => {
    render(<GetSection />);
    const linkElement = screen.getByText(/React Axios GET/i);
    expect(linkElement).toBeInTheDocument();
});
test('GetSection Get Button', () => {
    render(<GetSection />);
    const linkElement = screen.getByText(/Get All/i);
    expect(linkElement).toBeInTheDocument();
});
test('GetSection Clear Get Button', () => {
    render(<GetSection />);
    const linkElement = screen.getByText(/Clear/i);
    expect(linkElement).toBeInTheDocument();
});
// Test User Action case
test('Render Get Button Clicked', () => {

    render(<GetSection />)
    userEvent.click(screen.getByText('Get All'));
    expect(screen.getByTestId('getall-button')).toBeCalled
})
test('Render Clear Get Button Clicked', () => {

    render(<GetSection />)
    userEvent.click(screen.getByText('Clear'));
    expect(screen.getByTestId('clear-button')).toBeCalled
})
// Test API Call case
test("renders products", async () => {
    await act(async () => {
        await axios.get.mockImplementationOnce(() => Promise.resolve(mockResponse));
        render(<GetSection />);

        const button = screen.getByTestId("getall-button");
        userEvent.click(button);
    });

    const response = screen.getByTestId("get-response");
    expect(response).toBeInTheDocument();
});

test("renders error", async () => {
    await act(async () => {
        await axios.get.mockImplementationOnce(() => Promise.reject(mockError));
        render(<GetSection />);

        const button = screen.getByTestId("getall-button");
        userEvent.click(button);
    });
});
