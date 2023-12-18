export interface IUseCase<TInput, TOutput> {
  handle(input: TInput): Promise<TOutput>
}
