<?php

namespace App\Controller\Admin;

use App\Entity\User;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\Field;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class UserCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return User::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            TextField::new('email')->setLabel('Email'),
            TextField::new('name')->setLabel('Nom'),
            TextField::new('firstname')->setLabel('Prénom'),
            Field::new('lessonUsersAsString', 'Cours inscrits')->onlyOnIndex(),
        ];
    }
}
