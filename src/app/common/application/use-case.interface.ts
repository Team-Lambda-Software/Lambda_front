
export interface IUseCase<L, R> {
    execute(data: L): R
}