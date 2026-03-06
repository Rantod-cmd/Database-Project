BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Province] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Province_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Province_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[Hospital] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [provinceId] NVARCHAR(1000) NOT NULL,
    [status] NVARCHAR(1000) NOT NULL,
    [beds] INT NOT NULL,
    [category] NVARCHAR(1000),
    [phone] NVARCHAR(1000),
    [emergency] NVARCHAR(1000),
    CONSTRAINT [Hospital_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Disease] (
    [id] INT NOT NULL IDENTITY(1,1),
    [icdCode] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Disease_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Disease_icdCode_key] UNIQUE NONCLUSTERED ([icdCode])
);

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] INT NOT NULL IDENTITY(1,1),
    [username] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [hospitalId] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_username_key] UNIQUE NONCLUSTERED ([username])
);

-- AddForeignKey
ALTER TABLE [dbo].[Hospital] ADD CONSTRAINT [Hospital_provinceId_fkey] FOREIGN KEY ([provinceId]) REFERENCES [dbo].[Province]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_hospitalId_fkey] FOREIGN KEY ([hospitalId]) REFERENCES [dbo].[Hospital]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
