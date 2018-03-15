import { HIDE_NAVIGATION, DISPLAY_NAVIGATION } from '../src/constants';
import navigationManagerSaga, { displayNavigationSagaGenerator, hideNavigationSagaGenerator, displayNavigationSagaCallbackFunction, hideNavigationSagaCallbackFunction } from '../src/saga';

const mockReducerKey = 'mockReducerKey';
const mockAction = { hasProperties: 'mockAction', reducerKey: mockReducerKey };
const mockProps = { reducerKey: mockReducerKey };

const mockSagaCallback = 'mockSagaCallback';

function* mockSagaHandler(action, sagaCallback, reducerKey) {
  expect(action).toEqual(mockAction);
  expect(reducerKey).toEqual(mockReducerKey);
  yield sagaCallback;
}

test('navigationManagerSaga yields the proper methods for listening to action events', () => {
  const mockSagaOne = (reducerKey) => { expect(reducerKey).toEqual(mockReducerKey); return function* mockSagaOneGenerator() { return null; }; };
  const mockSagaTwo = (reducerKey) => { expect(reducerKey).toEqual(mockReducerKey); return function* mockSagaTwoGenerator() { return null; }; };
  const generator = navigationManagerSaga(mockProps, mockSagaOne, mockSagaTwo);
  let fork = generator.next().value;
  expect(fork.FORK.fn.name).toEqual('takeEvery');
  expect(fork.FORK.args[0]).toEqual(HIDE_NAVIGATION);
  expect(fork.FORK.args[1].name).toEqual('mockSagaOneGenerator');
  fork = generator.next().value;
  expect(fork.FORK.fn.name).toEqual('takeEvery');
  expect(fork.FORK.args[0]).toEqual(DISPLAY_NAVIGATION);
  expect(fork.FORK.args[1].name).toEqual('mockSagaTwoGenerator');
  expect(generator.next().done).toBeTruthy();
});

test('hideNavigationSagaGenerator invokes the sagaHandler with the correct saga callback and arguments', () => {
  const generator = hideNavigationSagaGenerator(mockReducerKey)(mockAction, mockSagaHandler, mockSagaCallback);
  expect(generator.next().value).toEqual(mockSagaCallback);
  expect(generator.next().done).toBeTruthy();
});

test('displayNavigationSagaGenerator invokes the sagaHandler with the correct saga callback and arguments', () => {
  const generator = displayNavigationSagaGenerator(mockReducerKey)(mockAction, mockSagaHandler, mockSagaCallback);
  expect(generator.next().value).toEqual(mockSagaCallback);
  expect(generator.next().done).toBeTruthy();
});

test('hideNavigationSagaCallbackFunction delays for the duration of the animation and then dispatches the navigationHiddenActionCreator', () => {
  const mockNavigationHiddenAction = {
    type: 'mockType',
    reducerKey: mockReducerKey,
  };
  const mockNavigationHiddenActionCreator = (reducerKey) => {
    expect(reducerKey).toEqual(mockReducerKey);
    return mockNavigationHiddenAction;
  };
  const generator = hideNavigationSagaCallbackFunction(mockAction, mockNavigationHiddenActionCreator);
  const delay = generator.next().value;
  expect(delay).toBeDefined();
  const put = generator.next().value;
  expect(put.PUT.action).toEqual(mockNavigationHiddenAction);
  expect(generator.next().done).toBeTruthy();
});

test('displayNavigationSagaCallbackFunction delays for the duration of the animation and then dispatches the navigationDisplayedActionCreator', () => {
  const mockNavigationDisplayedAction = {
    type: 'mockType',
    reducerKey: mockReducerKey,
  };
  const mockNavigationDisplayedActionCreator = (reducerKey) => {
    expect(reducerKey).toEqual(mockReducerKey);
    return mockNavigationDisplayedAction;
  };
  const generator = displayNavigationSagaCallbackFunction(mockAction, mockNavigationDisplayedActionCreator);
  const delay = generator.next().value;
  expect(delay).toBeDefined();
  const put = generator.next().value;
  expect(put.PUT.action).toEqual(mockNavigationDisplayedAction);
  expect(generator.next().done).toBeTruthy();
});
