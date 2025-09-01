type BasePresenterCallback<D, A, E> = ({
  data,
  actions
}: {
  data: D,
  actions: A
}) => E;

/**
 * @template A referencing your presenter actions type
 * @template D referencing your presenter data type (structure)
 * @template E referencing your presenter Element, just use JSX.Element from 'react'
 * @template F referencing your presenter Component, just use FC from 'react'
 * */
type BaseWithPresenter<D, A, E, F> = (callback: BasePresenterCallback<D, A, E>) => F;