
export interface IApplicationService<D, R>
{
    execute ( data: D ): Promise<Result<R>>
    get name (): string
}
