import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import CardComponent from '../../CardComponent';

describe('<CardComponent />', () => {
    const setup = propOverrides => {
        const props = Object.assign(
            {
                item: {
                    id: 1,
                    name: 'Test name',
                    thumbnail: {
                        path: 'test',
                        extension: '.jpg',
                    },
                },
                toggleBookmark: jest.fn(),
            },
            propOverrides
        );

        const wrapper = shallow(<CardComponent {...props} />);

        return {
            props,
            wrapper
        };
            
    }

    it('renders div with card class', () => {
        const { props, wrapper } = setup();

        expect(wrapper.find('.card').length).toEqual(1);
    })
})