import '@testing-library/jest-dom';
import { act, render, screen } from "@testing-library/react";
import apiClient from "../../http-common";
import formatResponse from "../../utils/formatResponse";
import userEvent from '@testing-library/user-event';
import GetSection from "./view";
import axios from 'axios';

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
jest.mock("../../http-common", () => {
    return {
        data: {
            fact: testText
        }
    
    }
});
const testText = "suksees";
const errorText = "error";
const mockResponse = {
    data: {
        fact: testText
    }
}
const mockError = {
    data: {
        fact: errorText
    }
}
test('GetSection Data', async () => {
    await act(async () => {
        await apiClient.get.mockImplementationOnce(() => Promise.resolve(mockResponse));
        render(<GetSection/>);
    });
    const textElement = await screen.getByText(testText);
    expect(textElement).toBeInTheDocument;
})
test('Handle Error', async () => {
    await act(async () => {
        await apiClient.get.mockImplementationOnce(() => Promise.reject(mockError));
        render(<GetSection/>);
    });
    const textElement = await screen.getByText(errorText);
    expect(textElement).toBeInTheDocument;
});
