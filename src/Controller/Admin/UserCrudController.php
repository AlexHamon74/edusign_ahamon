<?php

namespace App\Controller\Admin;

use App\Entity\User;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
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
            IdField::new('id'),
            TextField::new('email'),
            TextField::new('name'),
            TextField::new('firstname'),
            ChoiceField::new('isPresent')
                ->setLabel('Présence')
                ->setChoices([
                    'Présent' => 1,
                    'Absent' => 0,
                ])
                ->renderAsBadges([
                    true => 'success',
                    false => 'danger',
                ]),
        ];
    }
}
