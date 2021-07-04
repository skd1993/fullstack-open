import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, prettyDOM } from '@testing-library/react';
import BlogContent from './BlogContent';
import BlogForm from './BlogForm';

describe('Blog static content test', () => {
  let blog = {};
  beforeAll(() => {
    blog = {
      title: 'test title',
      author: 'test author',
      url: 'test@test.com',
      likes: 999,
    };
  });
  test('Blog title & author visible by default, but url and likes are hidden', () => {
    const component = render(<BlogContent blog={blog} />);
    const blogTitle = component.container.querySelector('.blogTitle');
    expect(blogTitle).toBeVisible();
  });
  test('Blog url and likes are hidden', () => {
    const component = render(<BlogContent blog={blog} />);
    const blogDetails = component.container.querySelector('.blogDetails');
    expect(blogDetails).not.toBeVisible();
    const res = component.container.querySelector('.togglable');
    expect(res).toHaveStyle('display: none');
  });
  test('Blog title has expected content', () => {
    const component = render(<BlogContent blog={blog} />);
    const blogTitle = component.container.querySelector('.blogTitle');
    expect(blogTitle).toHaveTextContent('test title');
  });
  test('After clicking the View button, blog url and likes are displayed', () => {
    const component = render(<BlogContent blog={blog} />);
    const button = component.getByText('View');
    fireEvent.click(button);
    const div = component.container.querySelector('.togglable');
    expect(div).not.toHaveStyle('display: none');
  });
});

describe('event tests', () => {
  let blog = {};
  beforeAll(() => {
    blog = {
      title: 'test title',
      author: 'test author',
      url: 'test@test.com',
      likes: 999,
    };
  });
  test('if the like button is clicked twice, the event handler the component received as props is called twice', () => {
    const mockHandler = jest.fn();
    const component = render(
      <BlogContent blog={blog} likesIncrementHandler={mockHandler} />
    );
    const likeButton = component.getByText('Like');
    console.log(prettyDOM(likeButton));
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);
    expect(mockHandler.mock.calls).toHaveLength(2);
  });
  // test('form calls the event handler it received as props with the right details when a new blog is created', () => {
  //   const component = render(<BlogForm />);
  //   const titleInput = component.container.querySelector('#title');
  //   const urlInput = component.container.querySelector('#url');
  //   const blogForm = component.container.querySelector('form');
  //   const createBlogFn = jest.fn();
  //   fireEvent.change(titleInput, {
  //     target: { value: 'test title input' },
  //   });
  //   fireEvent.change(urlInput, {
  //     target: { value: 'test url input' },
  //   });

  //   fireEvent.submit(blogForm);
  // });
});
